import express from 'express';
import { CommentsBusiness } from '../business/CommentBusiness';
import { CommentController } from '../controller/CommentController';
import { CommentDatabase } from '../database/CommentDatabase';
import { PostDatabase } from '../database/PostDatabase';
import { UserDatabase } from '../database/UserDatabase';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';

export const commentRouter = express.Router()

const commentController = new CommentController (
    new CommentsBusiness(
        new PostDatabase(),
        new CommentDatabase(),
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

commentRouter.post("/:postId/comments", commentController.createComment)
commentRouter.get("/:postId/comments", commentController.getComments)
commentRouter.put("/:postId/comments/:commentId/vote", commentController.voteComment)