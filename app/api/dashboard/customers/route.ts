import { fetchCustomers } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const customers = await fetchCustomers();
        return NextResponse.json(customers)
    } catch (error) {
        return NextResponse.error();
    }
}