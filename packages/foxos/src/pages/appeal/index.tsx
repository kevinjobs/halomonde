import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import {
  Button,
  Table,
  Modal,
  Form,
  Select,
  DatePicker,
  ConfigProvider,
  InputNumber,
  Input,
} from "antd";
import locale from "antd/locale/zh_CN";
import mockData from "./appeal.mock.json";
import UNDERTAKERS from "./undertakers.mock.json";
import "./style.less";
import { PlusOutlined } from "@ant-design/icons";

dayjs.locale("zh-cn");

export type AppealItem = {
  id: number;
  countDown: number;
  caseId: string;
  undertaker: string;
  plaintiff: string;
  defendant: string;
  finishDate: string;
  appealSubmitDate: string;
  appealInceptDate: string;
  appealToLianDate: string;
  deadline: string;
  level2undertaker: string;
  level2caseId: string;
};

export default function AppealPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleOK = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const colums = [
    {
      title: "ID",
      dataIndex: "id",
      key: "key-id",
    },
    {
      title: "倒计时",
      dataIndex: "countDown",
      key: "key-countDown",
      className: "count-down-head",
      sorter: (a: AppealItem, b: AppealItem) => {
        return a.countDown - b.countDown;
      },
      render: (text: number) => <span>{text}</span>,
    },
    {
      title: "案号",
      dataIndex: "caseId",
      key: "key-caseId",
    },
    {
      title: "承办人",
      dataIndex: "undertaker",
      key: "key-undertaker",
    },
    {
      title: "当事人",
      dataIndex: "party",
      key: "key-party",
    },
    {
      title: "结案时间",
      dataIndex: "finishDate",
      key: "key-finishDate",
    },
    {
      title: "上诉状提交日期",
      dataIndex: "appealSubmitDate",
      key: "key-appealSubmitDate",
    },
    {
      title: "上诉状接收日期",
      dataIndex: "appealInceptDate",
      key: "key-appealInceptDate",
    },
    {
      title: "移送立案庭日期",
      dataIndex: "appealToLianDate",
      key: "key-appealToLianDate",
    },
    {
      title: "截止日期",
      dataIndex: "deadline",
      key: "key-deadline",
    },
    {
      title: "二审承办人",
      dataIndex: "level2undertaker",
      key: "key-level2undertaker",
    },
    {
      title: "二审案号",
      dataIndex: "level2caseId",
      key: "key-level2caseId",
    },
  ];

  const dataSource = mockData.map((item: AppealItem) => {
    return {
      ...item,
      countDown: dayjs(item.deadline).diff(dayjs(), "day") - 15,
      party: `${item.plaintiff} vs ${item.defendant}`,
      level2undertaker: <Input />,
      level2caseId: <Input />,
    };
  });

  return (
    <div className="page-appeal">
      <div className="appeal-head">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          iconPosition={"start"}
          onClick={handleAdd}
        >
          添加上诉案件
        </Button>
      </div>
      <Table dataSource={dataSource} columns={colums} />
      <Modal
        title="添加上诉案件"
        open={isModalOpen}
        onOk={handleOK}
        onCancel={handleCancel}
        footer={null}
      >
        <AppealForm />
      </Modal>
    </div>
  );
}

function AppealForm() {
  interface FieldType {
    caseId: string;
    undertaker: string;
    plaintiff: string;
    defendant: string;
    finishDate: string;
    appealSubmitDate: string;
    appealInceptDate: string;
    appealToLianDate: string;
  }

  const onFinish = () => {
    console.log("Success:");
  };

  const onFinishFailed = () => {
    console.log("Failed:");
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }} defaultValue={2024}>
        <Select.Option value="2024">2024</Select.Option>
        <Select.Option value="2023">2023</Select.Option>
        <Select.Option value="2022">2022</Select.Option>
        <Select.Option value="2021">2021</Select.Option>
        <Select.Option value="2020">2020</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <ConfigProvider locale={locale}>
      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 10 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="caseId"
          label="案号"
          rules={[{ required: true, message: "请输入案号" }]}
        >
          <InputNumber addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="承办人"
          name="undertaker"
          rules={[{ required: true, message: "请选择承办人" }]}
        >
          <Select defaultValue={""}>
            {UNDERTAKERS.map((item) => {
              return (
                <Select.Option value={item.name} key={item.name}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          name="finishDate"
          label="结案时间"
          rules={[{ required: true, message: "请选择结案时间" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item<FieldType>
          name="appealSubmitDate"
          label="上诉状提交事件"
          rules={[{ required: true, message: "请选择时间" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item<FieldType>
          name="appealInceptDate"
          label="上诉状接收日期"
          rules={[{ required: true, message: "请选择时间" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
}
