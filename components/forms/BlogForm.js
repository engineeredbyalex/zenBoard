import { useEffect, useState } from "react";
import axios from "axios";


export default function BlogForm({
    _id,
    title: existingTitle,
    headingOne: existingHeadingOne,
}) {
    const [title, setTitle] = useState(existingTitle || "");
    const [headingOne, setHeadingOne] = useState(existingHeadingOne || "");

    async function saveArticle(ev) {
        ev.preventDefault();

        const data = {
            title, headingOne,
        };

        try {
            if (_id) {
                await axios.put("/api/blog", { ...data, _id });
            } else {
                await axios.post("/api/blog", data);
            }
        } catch (error) {
            console.error('Error saving product:', error);
        }
    }

    return (
        <form onSubmit={saveArticle} className="p-4">
            <label className="block">Blog title</label>
            <input
                type="text"
                placeholder="Blog title"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                className="border p-2 my-2 w-full"
            />
            <label className="block">Heading One</label>
            <input
                type="text"
                placeholder="Heading One"
                value={headingOne}
                onChange={(ev) => setHeadingOne(ev.target.value)}
                className="border p-2 my-2 w-full"
            />

            {/* <div className="mb-2 flex flex-wrap gap-1">
                <label className="h-[200px] w-[200px] cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                    </svg>
                    <div>Adauga imagine</div>
                    <input type="file" onChange={uploadImages} className="hidden" />
                </label>
            </div> */}
            <button
                type="submit"
                className="bg-[#000] text-white font-bold py-2 px-4 rounded mt-4"
            >
                Save
            </button>
        </form>
    );
}
