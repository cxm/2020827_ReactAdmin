import ajax from './ajax.js'
import jsonp from 'jsonp'
import {message} from 'antd'

const BASE='http://39.100.225.255:5000'
export const reqLogin=(username,password)=>ajax(BASE+"/login",{username,password},"POST")

//添加用户
export const reqAddUse=(user)=>ajax("manage/user/add",user,"POST")

//jsonp请求
export const reqWeather=(city)=>{
    return new Promise((resolve,reject)=>{
        const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=8b624ac6ceaf77e71279e8190c70fd80`
        jsonp(url,{},(error,data)=>{
            //console.log('jsonp:',error,data)
            if(!error&&data.status==='success'){
                const {dayPictureUrl,weather}=data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather})
            }else{
                message.error('获取天气信息失败')
            }
        })
    })
}

//reqWeather('太原')

//查看分类
export const reqGetCategorys=(parentId)=>ajax(BASE+'/manage/category/list',{parentId})

//添加分类
export const reqAddCategory=({categoryName,parentId})=>ajax(BASE+'/manage/category/add',{categoryName,parentId},'POST')

//修改分类名称
export const reqUpdateCategory=({categoryId,categoryName})=>ajax(BASE+'/manage/category/update',{categoryId,categoryName},'POST')