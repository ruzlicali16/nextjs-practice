import { fetchInvoiceById } from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    try {
        const invoice = await fetchInvoiceById(id);
        return NextResponse.json(invoice)
    } catch (error) {
        return NextResponse.json({ error: error });
    }
}