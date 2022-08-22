import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDeleteAppMutation, useLazyListAppsQuery } from 'src/base/api';
import PageLayout from 'src/base/components/templates/PageLayout';
import { App } from 'src/features/apps/appsApi';
import AddNewApp from './AddNewApp';
import DeleteApp from './DeleteApp';
import EditApp from './EditApp';

const Apps = () => {
    const [fetchApps, { data }] = useLazyListAppsQuery({ refetchOnFocus: true });
    const [deleteApp] = useDeleteAppMutation()
    const [isAddAppVisible, setAddAppVisible] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
    const [isPatchAppVisible, setPatchAppVisible] = useState(false)
    const [selectedAppForEdit, setSelectedAppForEdit] = useState<App>()

    useEffect(() => {
        fetchApps({})
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text: any, record: any) => <DeleteApp id={record.id} onDeleteFinish={() => fetchApps({})} />
        }
    ]

    const deleteAll = async () => {
        for (let id of selectedRowKeys) {
            await deleteApp({ id })
        }
        fetchApps({})
    }

    const rowSelection = {
      onChange: (selectedRowKeys: React.Key[], selectedRows: App[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        setSelectedRowKeys(selectedRowKeys as string[])
      },
      getCheckboxProps: (record: App) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    return <PageLayout>
        <Button
          onClick={() => {
            setAddAppVisible(true)
          }}
          style={{ margin: '8px 0px'}}
          type="primary">
            Add New App
        </Button>
        {!selectedRowKeys.length || (
          <Button
            onClick={deleteAll}
            style={{ margin: '8px 32px'}}
            danger
          >
            Delete Selected
          </Button>)
        }
        <Table
          rowKey="id"
          dataSource={data?.data?.apps}
          columns={columns}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          onRow={(record) => {
            return {
              onClick: (event) => {
                setPatchAppVisible(true)
                setSelectedAppForEdit(record)
                event.preventDefault()
                event.stopPropagation()
              }, // click row
            };
          }}
        />
        <AddNewApp
          visible={isAddAppVisible}
          onCancel={() => setAddAppVisible(false)}
          onAdd={fetchApps}
        />
        <EditApp
          visible={isPatchAppVisible}
          onCancel={() => setPatchAppVisible(false)}
          onEdit={fetchApps}
          app={selectedAppForEdit}
        />
    </PageLayout>
};

export default Apps;
