"use server";

import { cookies } from 'next/headers';
import { signToken } from '../../lib/auth';

export async function loginAction(password) {
  try {
    const url = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;
    if (!url) return { error: "Configuration missing" };

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ action: "login", password }),
      headers: { "Content-Type": "application/json" },
    });
    
    const data = await res.json();
    
    if (data.success && data.token) {
      const token = await signToken({ admin: true });
      cookies().set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      return { success: true };
    } else {
      return { error: data.error || "Invalid password" };
    }
  } catch (error) {
    console.error(error);
    return { error: "An error occurred during login" };
  }
}

export async function forgotPasswordAction() {
  try {
    const url = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;
    if (!url) return { error: "Configuration missing" };

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ action: "forgot_password" }),
      headers: { "Content-Type": "application/json" },
    });
    
    const data = await res.json();
    if (data.success) {
      return { success: true };
    } else {
      return { error: data.error || "Failed to send reset link" };
    }
  } catch (error) {
    console.error(error);
    return { error: "An error occurred" };
  }
}

export async function logoutAction() {
  cookies().delete('admin_session');
}
