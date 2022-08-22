import { Button, Form, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledForm = styled(Form)`
    margin-top: 16px;
`;

export interface FormValues {
    name: string;
    description: string;
}

interface AppFormProps {
    formValues?: FormValues;
    onFinish: (values: FormValues) => void;
}

const AppForm: React.FC<AppFormProps> = ({ onFinish, formValues }) => {
    const onFormFinish = (values: any) => {
        console.log('Success:', values);
        onFinish(values);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <StyledForm
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFormFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <StyledForm.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input App Name!' }]}
            >
                <Input defaultValue={formValues?.name} />
            </StyledForm.Item>

            <StyledForm.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input the app Description!' }]}
            >
                <Input defaultValue={formValues?.description} />
            </StyledForm.Item>


            <StyledForm.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </StyledForm.Item>
        </StyledForm>
    );
};

export default AppForm;