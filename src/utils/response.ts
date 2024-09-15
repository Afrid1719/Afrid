import { NextResponse } from "next/server";

export function success(data: any) {
  return NextResponse.json(data, { status: 200 });
}

export function created(data: any) {
  return NextResponse.json(data, { status: 201 });
}

export function noContent() {
  return new NextResponse(null, { status: 204 });
}

export function notModified(unModifiedData: any) {
  return new NextResponse(unModifiedData, { status: 304 });
}

export function badRequest(err: string) {
  return NextResponse.json({ message: err }, { status: 400 });
}

export function unauthorized() {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export function notFound() {
  return NextResponse.json({ message: "Not Found" }, { status: 404 });
}

export function serverError(err: Error) {
  return NextResponse.json({ message: err.message }, { status: 500 });
}
