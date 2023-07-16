import React,{useEffect, useState} from 'react'
import {getAllProducts,addToCart,getProductsByCategory} from '../components/API/GetApi'
import { Badge,  Button,  Card, Image, List, Rate, Spin, Typography, message } from 'antd'
import '../App.css'
import { useParams } from 'react-router-dom'
function Products() {
    const param=useParams()
    const [product, setProduct] = useState([])
    const [loading, setloading] = useState(false);
    useEffect(() => {
        setloading(true);
        (param?.categoryid? 
            getProductsByCategory(param.categoryid)
             : 
             getAllProducts())
        .then((res)=> setProduct(res.products))
        console.log(product)
        setloading(false);
    }, [param])
    
    if(loading){
    return <Spin spinning />
    }
    
  return (
    <div>
        <List
        grid={{column:3}}
        renderItem={(product,index)=> {
            return (
                <Badge.Ribbon text={product.discountPercentage} 
                color="pink"
                className='itemCardBadge'
                >
            <Card 
            className='cardspace'
            title={product.title}
             key={index} 
             cover={<Image src={product.thumbnail} className='itemCardImage' 
             
             />} actions={[<Rate allowHalf disabled value={product.rating } />,
             <AddToCartButton item={product}/>]}
             >
                
                <Card.Meta 
                title={<Typography.Paragraph>${product.price} {""}  
                 <Typography.Text delete type='danger'>{parseFloat( product.price + product.price * product.discountPercentage/100).toFixed(2)}
                 </Typography.Text>
                </Typography.Paragraph>} description={<Typography.Paragraph ellipsis={{rows:2 ,expandable:true,symbol:"more"}}>{product.description}</Typography.Paragraph>}>
                    
                </Card.Meta>
            
             </Card>
             </Badge.Ribbon>
                 )
        }}
        dataSource={product}
        >

        </List>
    </div>
  )
}

export default Products;

function AddToCartButton ({item}){
    const [loading, setLoading] = useState(false)
    const addProductToCart =(id)=>{
        setLoading(true)
        addToCart(item.id).then(res =>{
            message.success(`${item.title} has been added to cart`)
        })
        setLoading(false)
    }
    return <Button type='default' onClick={ addProductToCart} loading={loading}></Button>
    
}