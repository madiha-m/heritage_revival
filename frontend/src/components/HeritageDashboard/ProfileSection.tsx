import React from 'react';
import { Button, Upload, message } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import Image from 'next/image';
import styles from './styles.module.css';

interface ProfileSectionProps {
    profileImage?: string;
    onImageChange: (image: string) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profileImage, onImageChange }) => {
    const props: UploadProps = {
        beforeUpload: (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG files!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Image must be smaller than 2MB!');
            }

            if (isJpgOrPng && isLt2M) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    onImageChange(e.target?.result as string);
                };
                reader.readAsDataURL(file);
            }

            return false;
        },
    };

    return (
        <div className={styles.profileSection}>
            <div className={styles.profileImageContainer}>
                {profileImage && profileImage !== '' ? (
                    <Image src={profileImage} alt="Profile" width={100} height={100} className={styles.profileImage} />
                ) : (
                    <div className={styles.profilePlaceholder}>
                        <UserOutlined style={{ fontSize: '32px', color: '#999' }} />
                    </div>
                )}
            </div>
            <Upload {...props} showUploadList={false}>
                <Button
                    type="primary"
                    size="large"
                    className={styles.submitButton}
                    icon={<UploadOutlined />}
                >
                    Upload Profile Picture
                </Button>
            </Upload>

        </div>
    );
};

export default ProfileSection;
