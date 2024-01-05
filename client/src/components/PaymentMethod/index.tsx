import { paymentOptions } from "../../constants";
import { Radio, Space, RadioChangeEvent } from "antd";
import React from "react";


const PaymentMethods: React.FC<{
  paymentMethod: string | null;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <div className="w-full flex flex-center justify-evenly animate-slideright ">
      <Radio.Group
        onChange={(e: RadioChangeEvent) => setPaymentMethod(e.target.value)}
        className="flex flex-col shadow-md shadow-gray-400 rounded-lg w-[90%] lg:w-[40%] min-h-[30vh] my-10 py-5 "
      >
        <Space
          className="px-5 h-full flex flex-col gap-10"
          direction="vertical"
        >
          {paymentOptions.map((option, index) => (
            <Radio
              disabled={!option.available}
              key={`paymentOption-${index}`}
              className={`w-full h-16 text-center flex items-center font-neon font-bold hover:text-primary ${
                option.value === paymentMethod && "text-prm-dark"
              } `}
              value={option.value}
            >
              {option.label}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default PaymentMethods;
