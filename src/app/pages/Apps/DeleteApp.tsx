import React from 'react'
import { Button } from 'antd';
import { useDeleteAppMutation } from 'src/base/api';
import { openNotificationWithIcon } from 'src/utils/notification';

interface DeleteAppProps {
    id: number;
    onDeleteFinish: () => void;
}
const DeleteApp: React.FC<DeleteAppProps> = ({ id, onDeleteFinish }) => {
    const [deleteApp] = useDeleteAppMutation()
    const onDelete = () => {
        deleteApp({ id }).unwrap()
            .then(onDeleteFinish)
            .catch((err) => openNotificationWithIcon('error', err?.data?.message, err?.data?.type))
    };

    return (
        <Button onClick={onDelete} type="link" danger>
            Delete
        </Button>
    )
};

export default DeleteApp
