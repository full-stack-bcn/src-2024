#!/usr/bin/env bun

import { base64url } from "jose";

const randByte = () => Math.floor(256*Math.random());
const bytes = Uint8Array.from({ length: 32 }).map(_ => randByte());

const secret = base64url.encode(bytes);
console.log(secret);