import express from 'express';
const router = express.Router();

router.get("/api/email", (req, res) => {
  const email = "danielarribasvelazquez@dav-tech.work";
  res.json({ email });
});

export default router;
