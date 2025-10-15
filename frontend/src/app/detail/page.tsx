'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DetailView from '@/components/DetailView';
import { PricingData } from '@/types';

import { Form, Input, Button } from "antd";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const DetailPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(stored));
    form.setFieldsValue(JSON.parse(stored));
  }, [form, router]);

  const onFinish = async (values: any) => {
    try {
      // Update user details except email
      const res = await fetch(`/api/members/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, email: user.email }),
      });
      if (!res.ok) throw new Error("Update failed");
      Swal.fire({ icon: "success", title: "Profile updated" });
      localStorage.setItem("user", JSON.stringify({ ...user, ...values }));
    } catch {
      Swal.fire({ icon: "error", title: "Update failed" });
    }
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Your Details</h2>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={user}>
        <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}> <Input /> </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true }]}> <Input /> </Form.Item>
        <Form.Item name="companyName" label="Company Name"> <Input /> </Form.Item>
        <Form.Item name="location" label="Location" rules={[{ required: true }]}> <Input /> </Form.Item>
        <Form.Item name="mobileNumber" label="Mobile Number" rules={[{ required: true }]}> <Input /> </Form.Item>
        <Form.Item name="email" label="Email">
          <Input disabled />
        </Form.Item>
        <Button type="primary" htmlType="submit">Save</Button>
      </Form>
    </div>
  );
};

export default DetailPage;
