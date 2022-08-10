import { NextResponse } from 'next/server';
// import { verify } from 'jsonwebtoken';
import { jwtVerify } from 'jose';

export async function middleware(request) {
    const jwt = request.cookies.get('myTokenName');

    if (jwt === undefined) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
        const { payload } = await jwtVerify(jwt, new TextEncoder().encode('SECRET'));
        console.log(payload);
        return NextResponse.next();
    } catch (err) {
        console.log(err);
        return NextResponse.redirect(new URL('/login', request.url))
    }
};

export const config = {
    // matcher: ['/dashboard', '/', '/admin/profile', '/admin/user']
    matcher: ['/dashboard', '/', '/admin/:path*']
}


// Primera forma
// export async function middleware(request) {
//     // console.log(request.url)
//     // console.log(request.nextUrl.pathname)
//     const jwt = request.cookies.get('myTokenName');

//     if (request.nextUrl.pathname.includes('/dashboard')) {
//         if (jwt === undefined) {
//             return NextResponse.redirect(new URL('/login', request.url))
//         }

//         try {
//             const { payload } = await jwtVerify(jwt, new TextEncoder().encode('SECRET'));
//             return NextResponse.next();
//         } catch (err) {
//             console.log(err);
//             return NextResponse.redirect(new URL('/login', request.url))
//         }
//     };

//     return NextResponse.next();
// };