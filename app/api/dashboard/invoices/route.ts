import { fetchInvoicesPages } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query') || '';

    try {
        const totalPages = await fetchInvoicesPages(query);
        return NextResponse.json(totalPages)
    } catch (error) {
        return NextResponse.error();
    }
}