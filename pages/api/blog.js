import { Blog } from "@/models/Blog"
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
    try {
        console.log('Received request:', req.body);
        console.log('Properties:', req.body.properties);
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

    const { method } = req;

    try {
        await mongooseConnect();
        await isAdminRequest(req, res);

        if (method === "GET") {
            if (req.query?.id) {
                const blog = await Blog.findOne({ _id: req.query.id });
                res.json(blog);
            } else {
                const blog = await Blog.find();
                res.json(blog);
            }
        }

        if (method === "POST") {
            const { title, } = req.body;
            const blogDoc = await Product.create({
                title, 
            });
            res.json(blogDoc);
        }

        if (method === "PUT") {
            const { title, } = req.body;
            await Blog.updateOne(
                { _id },
                {
                    title,
                }
            );
            res.json(true);
        }

        if (method === "DELETE") {
            if (req.query?.id) {
                await Blog.deleteOne({ _id: req.query?.id });
                res.json(true);
            }
        }
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}