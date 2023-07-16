import React,{useEffect, useState} from 'react'
import '../../App.css'
import { Badge, Drawer, Menu, Table, Typography,InputNumber, Button, Form, Checkbox, message } from 'antd'
import {  useNavigate } from 'react-router-dom'
import {HomeFilled,ShoppingCartOutlined} from '@ant-design/icons'
import {getCart} from '../API/GetApi'
function Header() {
    const navigate=useNavigate()
    function onMenuclick(item){
        navigate(`/${item.key}`)
    }
  return (
    <div className='appHeader'>
        <Menu 
        onClick={onMenuclick}
        mode='horizontal'
        items={[
            {
                label: <HomeFilled />,
                key:''
            },
            {
                label:"Home",
                key:'home',
            },
            {
                label:"Men",
                key:'men',
                children:[
                    {
                        label:"Men's Shirts",
                        key:"men-shirts",
                    },
                    {
                        label:"Men's Shoes",
                        key:"men-shoes"
                    },
                    {
                        label:"Men's Watches",
                        key:"men-Watches"
                    },
                ]
            },
            {
                label:"Women",
                key:'women',
                children:[
                    {
                        label:"Women's Shirts",
                        key:"women-shirts"
                    },
                    {
                        label:"Women's Shoes",
                        key:"women-shoes"
                    },
                    {
                        label:"Women's Watches",
                        key:"women-Watches"
                    },
                ]
            },
            {
                label:"Fragrances",
                key:'fragrances'
            }
        ]}
        >
        </Menu>
            <h3>Shuti Store</h3>
            <AppCart />
    </div>
  )
}

export default Header

function AppCart(){
    const [cartopen, setcartopen] = useState(false)
    const [chekcartopen, setchekcartopen] = useState(false)
    const [cartitems, setCartitems] = useState([])
    useEffect(() => {
        getCart().then((res)=> setCartitems(res.products))
    }, [])
    const confirmOrder=(values)=>{
        console.log({values})
        setcartopen(false)
        setchekcartopen(false);
        message.success('your order has been placed successfully')
        values={}
    }
    
    return (
        <div>
            <Badge count={cartitems.length} className='carticon'  > 
            <ShoppingCartOutlined  onClick={()=> setcartopen(true)}/>
            </Badge>
            <Drawer open={cartopen}  onClose={()=> setcartopen(false)} title={'Your Cart'} contentWrapperStyle={{width:500}}>
                <Table columns={[
                    {
                        title:'Title',
                        dataIndex:'title'
                    },
                    {
                        title:'Price',
                        dataIndex:'price',
                        render:(value)=> {return <span>${value}</span>}
                    },
                    {
                        title:'Quantity',
                        dataIndex:'quantity',
                        render:(value)=> {
                            return <InputNumber defaultValue={value} min={0} onChange={(value)=>{
                                setCartitems(pre=> pre.map((cart)=>{
                                    if(MediaRecorder.id=cart.id){
                                        cart.total=cart.price * value;
                                    }
                                    return cart
                                }))
                            }}></InputNumber>
                        }

                    },
                    {
                        title:'Total',
                        dataIndex:'total',
                        render:(value)=> {return <span>${value}</span>}
                    },
                ]}
                pagination={false}
                dataSource={cartitems}
                summary={(data)=>{
                   const total=data.reduce((pre,current)=>{
                    return pre + current.total;
                    },0)
                    return <span>Total: ${total}</span>  
                }}
                ></Table><br />
                <Button type='primary' onClick={()=> setchekcartopen(true)}>checkout</Button>
                <Drawer open={chekcartopen} onClose={()=> setchekcartopen(false)} title={'Confirm Order'}>
                    <Form onFinish={confirmOrder}>
                        <Form.Item rules={[
                            {
                                required:true,
                                message:'Enter your Full Name'
                            }
                        ]}
                         label=" Name" name={'Full_Name'}>
                            <input placeholder='Enter full name ...' />
                        </Form.Item>
                        <Form.Item rules={[
                            {
                                required:true,
                                message:'Enter your email'
                            }
                        ]} label="Email" name={'email'}>
                            <input placeholder='Enter Email ...' />
                        </Form.Item>
                        <Form.Item rules={[
                            {
                                required:true,
                                message:'Enter your Address'
                            }
                        ]} label="Address" name={'adress'}>
                            <input placeholder='Enter Address ...' />
                        </Form.Item>
                        <Form.Item>
                            <Checkbox defaultChecked disabled>Cah on Delivery</Checkbox>
                        </Form.Item>
                        <Typography.Paragraph type='secondary' >more methods coming soon</Typography.Paragraph>
                        <Button type='primary' htmlType='submit'>confirm</Button>
                    </Form>
                </Drawer>
            </Drawer>
        </div>
    )
}