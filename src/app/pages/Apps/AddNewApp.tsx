import { Modal } from 'antd';
import React from 'react';
import { useInsertAppMutation } from 'src/base/api';
import AppForm from 'src/base/components/AppForm';
import { App } from 'src/features/apps/appsApi';
import { openNotificationWithIcon } from 'src/utils/notification';

interface AddNewAppProps {
    visible: boolean;
    onCancel: () => void;
    onAdd: (app: App) => void;
}
const AddNewApp: React.FC<AddNewAppProps> = ({ onCancel, visible, onAdd }) => {
    const [insertApp] = useInsertAppMutation()

    const onFinish = (formValues: any) => {
        insertApp(formValues).unwrap()
            .then(() => {
                onCancel();
                onAdd(formValues)
            })
            .catch((err) => openNotificationWithIcon('error', err?.data?.message, err?.data?.type))
    };

    return (
        <Modal destroyOnClose onCancel={onCancel} visible={visible} width={400} footer={null}>
            <AppForm onFinish={onFinish} />
        </Modal>
    )
};

export default AddNewApp;