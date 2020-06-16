const { ROLE } = require("../data");

const canViewProject = (user, project) =>
  user.role === ROLE.ADMIN || project.userId === user.id;

const scopedProjects = (user, projects) =>
  user.role === ROLE.ADMIN
    ? projects
    : projects.filter((project) => project.userId === user.id);

const canDeleteProject = (user, project) => project.userId === user.id;

module.exports = { canViewProject, scopedProjects, canDeleteProject };
