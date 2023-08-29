import { Request, Response } from "express";
import { ZodError } from "zod";
import { CommentsBusiness } from "../business/CommentBusiness";
import { createCommentSchema } from "../dtos/comment/createComment.dto";
import { getCommentsSchema } from "../dtos/comment/getComment.dto";
import { voteCommentSchema } from "../dtos/comment/voteComment.dto";
import { BaseError } from "../errors/BaseError";

export class CommentController {
    constructor(
        private commentBusiness: CommentsBusiness
    ) { }

    public createComment = async (req: Request, res: Response) => {
        try {
            const input = createCommentSchema.parse({
                token: req.headers.authorization,
                postId: req.params.postId,
                content: req.body.content
            })

            const response = await this.commentBusiness.createComment(input)

            res.status(201).send(response)

        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }

    }

    public getComments = async (req: Request, res: Response) => {
        try {
            const input = getCommentsSchema.parse({
                token: req.headers.authorization,
                postId: req.params.postId
            })

            const response = await this.commentBusiness.getComments(input)
            res.status(200).send(response)

        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public voteComment = async (req: Request, res: Response) => {
        try {
            const input = voteCommentSchema.parse({
                token: req.headers.authorization,
                commentId: req.params.commentId,
                vote: req.body.vote
            })

            const response = await this.commentBusiness.voteComment(input)
            res.status(200).send(response)

        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}