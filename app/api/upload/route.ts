import { IncomingMessage, ServerResponse } from "http";
import { NextResponse, NextRequest } from "next/server";
import { pipeline } from "stream";
import { promisify } from "util";
import fs from "fs";
import { Readable } from "stream";

const pump = promisify(pipeline);

function readableStreamToNodeStream(
  readableStream: ReadableStream<Uint8Array>
) {
  const reader = readableStream.getReader();
  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) {
        this.push(null);
      } else {
        this.push(value);
      }
    },
  });
}

export async function POST(request: NextRequest, response: ServerResponse) {
  try {
    const formData = await request.formData();
    const file = formData.get("files");
    const destination = formData.get("destination");

    if (!destination) {
      return new NextResponse("Destination not provided!", {
        status: 500,
      });
    }

    if (file instanceof File) {
      const filePath = `${destination}/${file.name}`;
      const nodeStream = readableStreamToNodeStream(file.stream());

      await pump(nodeStream, fs.createWriteStream(filePath));

      return new NextResponse(file.name, { status: 200 });
    }
  } catch (error: any) {
    console.error("Error processing upload:", error.message); // Log detailed error
    return new NextResponse(error.message, { status: 500 });
  }
}
