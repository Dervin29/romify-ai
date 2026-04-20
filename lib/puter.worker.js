// lib/puter.worker.js

const PROJECT_PREFIX = 'roomify_ai_project';

/**
 * Standard JSON error response
 */
const jsonError = (status, message, details = {}) => {
  return new Response(
    JSON.stringify({
      error: {
        message,
        ...details,
      },
    }),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
};

/**
 * Get authenticated user ID
 */
const getUserId = async (userPuter) => {
  try {
    const user = await userPuter.auth.getUser();
    return user?.uuid || null;
  } catch {
    throw new Error('Failed to get user ID');
  }
};

/**
 * Build user-scoped KV key
 */
const getProjectKey = (userId, projectId) => {
  return `${PROJECT_PREFIX}:${userId}:${projectId}`;
};

/**
 * POST /api/projects/save
 * Save or update a project
 */
router.post('api/projects/save', async ({ request, user }) => {
  try {
    const userPuter = user.puter;
    if (!userPuter) return jsonError(401, 'Authentication failed');

    const userId = await getUserId(userPuter);
    if (!userId) return jsonError(401, 'Authentication failed');

    const body = await request.json();
    const project = body?.project;

    if (!project || !project.id) {
      return jsonError(400, 'Invalid project', {
        message: 'Project must have an id',
      });
    }

    // If sourceImage must exist, enforce it properly
    if (!project.sourceImage) {
      return jsonError(400, 'Invalid project', {
        message: 'Project must include sourceImage',
      });
    }

    const payload = {
      ...project,
      updatedAt: new Date().toISOString(),
    };

    const key = getProjectKey(userId, project.id);
    await userPuter.kv.set(key, payload);

    return new Response(
      JSON.stringify({
        saved: true,
        id: project.id,
        project: payload,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    return jsonError(500, 'Failed to save project', {
      message: error.message || 'Unknown error',
    });
  }
});

/**
 * GET /api/projects/list
 * List all projects for the authenticated user
 */
router.get('/api/projects/list', async ({ user }) => {
  try {
    const userPuter = user.puter;
    if (!userPuter) return jsonError(401, 'Authentication failed');

    const userId = await getUserId(userPuter);
    if (!userId) return jsonError(401, 'Authentication failed');

    const keys = await userPuter.kv.list();

    // Filter only this user's projects
    const prefix = `${PROJECT_PREFIX}:${userId}:`;
    const projectKeys = keys.filter((k) => k.startsWith(prefix));

    const projects = await Promise.all(
      projectKeys.map((key) => userPuter.kv.get(key))
    );

    return new Response(
      JSON.stringify({ projects }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    return jsonError(500, 'Failed to list projects', {
      message: error.message || 'Unknown error',
    });
  }
});

/**
 * GET /api/projects/get?id=...
 * Fetch a single project
 */
router.get('/api/projects/get', async ({ request, user }) => {
  try {
    const userPuter = user.puter;
    if (!userPuter) return jsonError(401, 'Authentication failed');

    const userId = await getUserId(userPuter);
    if (!userId) return jsonError(401, 'Authentication failed');

    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return jsonError(400, 'Missing project id');
    }

    const key = getProjectKey(userId, id);
    const project = await userPuter.kv.get(key);

    if (!project) {
      return jsonError(404, 'Project not found');
    }

    return new Response(
      JSON.stringify({ project }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    return jsonError(500, 'Failed to fetch project', {
      message: error.message || 'Unknown error',
    });
  }
});