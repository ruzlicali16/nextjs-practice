import { fetchFilteredInvoices } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query') || '';
    const currentPage = Number(searchParams.get('page')) || 1;

    try {
        const invoices = await fetchFilteredInvoices(query, currentPage);
        return NextResponse.json(invoices)
    } catch (error) {
        return NextResponse.error();
    }
}