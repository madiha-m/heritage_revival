"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button } from "antd";
import Swal from "sweetalert2";

const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onFinish = async (values: { email: string; password: string }) => {
        setLoading(true);
        try {
            const res = await fetch("/api/members/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const data = await res.json();
            if (!res.ok) {
                Swal.fire({ icon: "error", title: "Login Failed", text: data.message || "Invalid credentials" });
                setLoading(false);
                return;
            }
            // Save user info to localStorage/session (for demo)
            localStorage.setItem("user", JSON.stringify(data));
            Swal.fire({ icon: "success", title: "Login Successful" }).then(() => {
                router.push("/detail");
            });
        } catch (err) {
            Swal.fire({ icon: "error", title: "Login Failed", text: "Network error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "40px auto" }}>
            <h2>Login</h2>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter your email" }, { type: "email", message: "Invalid email" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please enter your password" }]}>
                    <Input.Password />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default LoginPage;
