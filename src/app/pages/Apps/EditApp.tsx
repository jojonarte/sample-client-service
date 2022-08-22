import { Modal } from 'antd';
import React from 'react';
import { usePatchAppMutation } from 'src/base/api';
import AppForm, { FormValues } from 'src/base/components/AppForm';
import { App } from 'src/features/apps/appsApi';
import { openNotificationWithIcon } from 'src/utils/notification';

interface EditAppProps {
    app?: App;
    visible: boolean;
    onCancel: () => void;
    onEdit: (app: App) => void;
}
const EditApp: React.FC<EditAppProps> = ({ onCancel, visible, onEdit, app }) => {
    const [patchApp] = usePatchAppMutation()

    const onFinish = (formValues: any) => {
        patchApp({
            id: app?.id,
            ...formValues,
        }).unwrap()
            .then(() => {
                onCancel();
                onEdit(formValues)
            })
            .catch((err) => openNotificationWithIcon('error', err?.data?.message, err?.data?.type))
    };

    return (
        <Modal destroyOnClose onCancel={onCancel} visible={visible} width={400} footer={null}>
            <AppForm onFinish={onFinish} formValues={app} />
        </Modal>
    )
};

export default EditApp;