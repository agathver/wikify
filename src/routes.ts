import {Router} from "express";
import {index} from "./controllers";
import login from './security/login';
import {editPage, savePage, viewPage} from "./controllers/wiki";

const router = Router();

router.use('/login', login);

router.get('/', index);
// router.use('/wiki', wiki);
router.get(/\/wiki\/(.*)/, viewPage);
router.get(/\/wiki\/(.*)\/edit/, editPage);
router.post(/\/wiki\/(.*)/, savePage);

// router.use('/register', register);

export default router;
