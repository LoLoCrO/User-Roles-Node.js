const express = require("express");
const router = express.Router();
const { projects } = require("../data");
const { authUser, authRole } = require("../basicAuth");
const {
  canViewProject,
  scopedProjects,
  canDeleteProject,
} = require("../premissions/project");

const authGetProject = (req, res, next) => {
  if (!canViewProject(req.user, req.project)) {
    res.status(401);
    return res.send("Not Allowed!");
  }
  next();
};

const authDeleteProject = (req, res, next) => {
  if (!canDeleteProject(req.user, req.project)) {
    res.status(401);
    return res.send("Not Allowed!");
  }
  next();
};

router.get("/", authUser, (req, res) => {
  res.json(scopedProjects(req.user, projects));
});

router.delete(
  "/:projectId",
  setProject,
  authUser,
  authDeleteProject,
  (req, res) => {
    res.send("Deleted project!");
  }
);

router.get("/:projectId", setProject, authUser, authGetProject, (req, res) => {
  res.json(req.project);
});

function setProject(req, res, next) {
  const projectId = parseInt(req.params.projectId);
  req.project = projects.find((project) => project.id === projectId);

  if (req.project == null) {
    res.status(404);
    return res.send("Project not found");
  }
  next();
}

module.exports = router;
