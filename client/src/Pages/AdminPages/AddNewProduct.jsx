import { Button, Form, Input, Select, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import API from '../../API/Routes';


const { Item } = Form

const AddNewProduct = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
    const setSlug = (name) => {
        document.getElementById('slug').value = name.target.value.replace(/\s+/g, '-')
    }
    const onFinish = async (data) => {
        API.CreateProduct({data}).then((response)=>{
            if (response.status){
                messageApi.success({
                    content: 'Product Created Successfully!'
                })
                navigate('/admin')
            }
            else {
                messageApi.error({
                    content: response.data?.error?.message || 'Coudn\'t create your product.\nCheck console'
                })
            }
        })
    };

    return (
        <>
            {contextHolder}
            <section className='flex flex-col justify-center items-center'>

                <Form onFinish={onFinish} className='w-[80%] p-5 border-2 border-black'>
                    <Item name='productName' required={true} label='Enter Product Name :'>
                        <Input onChange={setSlug} type='string' />
                    </Item>
                    <Item name='productDescription' label='Enter Product Description :'>
                        <TextArea rows={6} ></TextArea>
                    </Item>
                    <div className='flex flex-col md:flex-row justify-evenly'>
                        <Item name='productCategory' required={true} label='Select a Category'>
                            <Select defaultValue={'none'} options={[
                                {
                                    value: 'television',
                                    label: 'Televisions'
                                },
                                {
                                    value: 'washing_machine',
                                    label: 'Washing Machines'
                                }, {
                                    value: 'sewing_machine',
                                    label: 'Sewing Machines'
                                }, {
                                    value: 'cooler',
                                    label: 'Coolers'
                                }, {
                                    value: 'refrigerator',
                                    label: 'Refrigerators'
                                },
                            ]} ></Select>
                        </Item>
                        <Item required name={'stock'} label={'Product Available Stock'}>
                            <Input type='number' />
                        </Item>
                    </div>
                    <div className='flex flex-col md:flex-row justify-evenly'>
                        <Item name='productMRP' required label='Enter Product M.R.P. :'>
                            <Input type='number' />
                        </Item>
                        <Item name='productSP' required label='Enter Selling Price :'>
                            <Input type='number' />
                        </Item>
                    </div>
                    <div >
                        <Item label='Enter Product Highlights'>

                            <Form.List
                                name="highlights"

                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <Form.Item
                                                label={`Highlight ${index + 1}`}
                                                required={false}
                                                key={field.key}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: "Enter a highlight or delete this field.",
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    />
                                                </Form.Item>
                                                {(
                                                    <MinusCircleOutlined
                                                        onClick={() => remove(field.name)}
                                                    />
                                                )}
                                            </Form.Item>
                                        ))}
                                        <Form.Item>
                                            <Button
                                                onClick={() => add()}
                                                style={{
                                                    width: '100%',
                                                }}
                                                icon={<PlusOutlined />}
                                            >
                                                Add field
                                            </Button>
                                            <Form.ErrorList errors={errors} />
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Item>
                        <Item label='Enter Product Images URL'>

                            <Form.List
                                name="images"
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <Form.Item
                                                label={`Image ${index + 1} src:`}
                                                required={false}
                                                key={field.key}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: "Enter a image src or delete this field.",
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    />
                                                </Form.Item>
                                                {(
                                                    <MinusCircleOutlined
                                                        onClick={() => remove(field.name)}
                                                    />
                                                )}
                                            </Form.Item>
                                        ))}
                                        <Form.Item>
                                            <Button
                                                onClick={() => add()}
                                                style={{
                                                    width: '100%',
                                                }}
                                                icon={<PlusOutlined />}
                                            >
                                                Add field
                                            </Button>
                                            <Form.ErrorList errors={errors} />
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Item>
                    </div>
                    <Item label='Set Slug' name={'slug'}>
                        <input style={{ width: '100%' }} id='slug' type='string' />
                    </Item>
                    <div className='w-full flex justify-center'>
                        <Button htmlType='submit' className=' bg-blue-500 text-white'>Add This Product</Button>
                    </div>
                </Form>
            </section>
        </>
    )
}

export default AddNewProduct
