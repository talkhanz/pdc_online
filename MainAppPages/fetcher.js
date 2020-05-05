import React from 'react';
import {Text} from 'react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';
const cheerio = require('cheerio-without-node-native');

export async function fetchIftariMenu(){

  var dataToReturn = []
  

  await fetch('https://pdc.lums.edu.pk/')
    .then( response => {return response.text()})
    .then( async htmlText => {
      const $ = cheerio.load(htmlText);
      var key = 1
          const tdList = $('#content_wrap').find('table:nth-child(7)').find('td:nth-child(2)')
         
          const noOfItems = Object.keys(tdList).filter( k => {
            return (parseInt(k) == k)
          })
          
          var localDocList = []
          await firestore().collection('Food GIfs').get().then(snapshot => {
            snapshot.forEach(doc => {
              localDocList.push(doc)
            })
                
          for (var i=1 ; i<noOfItems.length; i++){
            const foodItemAndPrices = {}
            const item = $('#content_wrap').find('table:nth-child(7)').find('td:nth-child(2)')[i].children[0].data
            const priceQuarter = $('#content_wrap').find('table:nth-child(7)').find('td:nth-child(3)')[i].children[0].data
            const priceHalf = $('#content_wrap').find('table:nth-child(7)').find('td:nth-child(4)')[i].children[0].data
            const priceStandard = $('#content_wrap').find('table:nth-child(7)').find('td:nth-child(5)')[i].children[0].data
            if (item != undefined){
              foodItemAndPrices['item'] = item
              foodItemAndPrices['quarter'] = priceQuarter
              foodItemAndPrices['half'] = priceHalf
              foodItemAndPrices['standard'] = priceStandard
              foodItemAndPrices['key'] = key
              key++
              for (var j=0 ; j<localDocList.length; j++){
                if(localDocList[j].id == item){
                    foodItemAndPrices['img'] = localDocList[j].data().img
                    break
                }
                else{
                    foodItemAndPrices['img'] = localDocList[0].data().img
                }
              }
            }
            dataToReturn.push(foodItemAndPrices)
          } 
        })
          
        if(dataToReturn.length == 0){
          dataToReturn = ['Menu not available']
        }
    })
    .catch(err => console.log(err))

    return dataToReturn
}

export async function fetchSehriMenu(){

  var dataToReturn = []

  await fetch('https://pdc.lums.edu.pk/')
    .then( response => {return response.text()})
    .then( async htmlText => {
      const $ = cheerio.load(htmlText);
      var key = 1
          const tdList = $('#content_wrap').find('table:nth-child(4)').find('td:nth-child(2)')
         
          const noOfItems = Object.keys(tdList).filter( k => {
            return (parseInt(k) == k)
          })

          var localDocList = []
          await firestore().collection('Food GIfs').get().then(snapshot => {
            snapshot.forEach(doc => {
              localDocList.push(doc)
            })

          for (var i=1 ; i<noOfItems.length; i++){
            const foodItemAndPrices = {}
            const item = $('#content_wrap').find('table:nth-child(4)').find('td:nth-child(2)')[i].children[0].data
            const priceQuarter = $('#content_wrap').find('table:nth-child(4)').find('td:nth-child(3)')[i].children[0].data
            const priceHalf = $('#content_wrap').find('table:nth-child(4)').find('td:nth-child(4)')[i].children[0].data
            const priceStandard = $('#content_wrap').find('table:nth-child(4)').find('td:nth-child(5)')[i].children[0].data
            if (item != undefined){
              foodItemAndPrices['item'] = item
              foodItemAndPrices['quarter'] = priceQuarter
              foodItemAndPrices['half'] = priceHalf
              foodItemAndPrices['standard'] = priceStandard
              foodItemAndPrices['key'] = key
              key++
              for (var j=0 ; j<localDocList.length; j++){
                if(localDocList[j].id == item){
                    foodItemAndPrices['img'] = localDocList[j].data().img
                    break
                }
                else{
                    foodItemAndPrices['img'] = localDocList[0].data().img
                }
              }
            }
            dataToReturn.push(foodItemAndPrices)
          }
        })
           
        if(dataToReturn.length == 0){
          dataToReturn = ['Menu not available']
        }
    })
    .catch(err => console.log(err))

    return dataToReturn
}

export async function fetchBreakfastMenu(){

  var dataToReturn = []

  await fetch('https://pdc.lums.edu.pk/')
    .then( response => {return response.text()})
    .then( async htmlText => {
      const $ = cheerio.load(htmlText);
      var key = 1
          const tdList = $('#content_wrap').find('table:nth-child(10)').find('td:nth-child(2)')
         
          const noOfItems = Object.keys(tdList).filter( k => {
            return (parseInt(k) == k)
          })
               
          var localDocList = []
          await firestore().collection('Food GIfs').get().then(snapshot => {
            snapshot.forEach(doc => {
              localDocList.push(doc)
            })
           
          for (var i=1 ; i<noOfItems.length; i++){
            const foodItemAndPrices = {}
            const item = $('#content_wrap').find('table:nth-child(10)').find('td:nth-child(2)')[i].children[0].data
            const priceQuarter = $('#content_wrap').find('table:nth-child(10)').find('td:nth-child(3)')[i].children[0].data
            const priceHalf = $('#content_wrap').find('table:nth-child(10)').find('td:nth-child(4)')[i].children[0].data
            const priceStandard = $('#content_wrap').find('table:nth-child(10)').find('td:nth-child(5)')[i].children[0].data
            if (item != undefined){
              foodItemAndPrices['item'] = item
              foodItemAndPrices['quarter'] = priceQuarter
              foodItemAndPrices['half'] = priceHalf
              foodItemAndPrices['standard'] = priceStandard
              foodItemAndPrices['key'] = key
              key++
              for (var j=0 ; j<localDocList.length; j++){
                if(localDocList[j].id == item){
                    foodItemAndPrices['img'] = localDocList[j].data().img
                    break
                }
                else{
                    foodItemAndPrices['img'] = localDocList[0].data().img
                }
              }
            }
            dataToReturn.push(foodItemAndPrices)
          }
        if(dataToReturn.length == 0){
          dataToReturn = ['Menu not available']
        }
      })
    })
    .catch(err => console.log(err))

    return dataToReturn
}
export async function fetchLunchMenu(){

  var dataToReturn = []

  await fetch('https://pdc.lums.edu.pk/')
  .then( response => {return response.text()})
  .then( async htmlText => {
    const $ = cheerio.load(htmlText);
    var key = 1
        const tdList = $('#content_wrap').find('table:nth-child(16)').find('td:nth-child(2)')
       
        const noOfItems = Object.keys(tdList).filter( k => {
          return (parseInt(k) == k)
        })

        var localDocList = []
        await firestore().collection('Food GIfs').get().then(snapshot => {
          snapshot.forEach(doc => {
            localDocList.push(doc)
          })
         
        for (var i=1 ; i<noOfItems.length; i++){
          const foodItemAndPrices = {}
          const item = $('#content_wrap').find('table:nth-child(16)').find('td:nth-child(2)')[i].children[0].data
          const priceQuarter = $('#content_wrap').find('table:nth-child(16)').find('td:nth-child(3)')[i].children[0].data
          const priceHalf = $('#content_wrap').find('table:nth-child(16)').find('td:nth-child(4)')[i].children[0].data
          const priceStandard = $('#content_wrap').find('table:nth-child(16)').find('td:nth-child(5)')[i].children[0].data
          if (item != undefined){
            foodItemAndPrices['item'] = item
            foodItemAndPrices['quarter'] = priceQuarter
            foodItemAndPrices['half'] = priceHalf
            foodItemAndPrices['standard'] = priceStandard
            foodItemAndPrices['key'] = key
            key++
            for (var j=0 ; j<localDocList.length; j++){
              if(localDocList[j].id == item){
                  foodItemAndPrices['img'] = localDocList[j].data().img
                  break
              }
              else{
                  foodItemAndPrices['img'] = localDocList[0].data().img
              }
            }
          }
          dataToReturn.push(foodItemAndPrices)
        }
      })
      if(dataToReturn.length == 0){
        dataToReturn = ['Menu not available']
      }
  })
  .catch(err => console.log(err))

  return dataToReturn
}
export async function fetchDinnerMenu(){

  var dataToReturn = []

  await fetch('https://pdc.lums.edu.pk/')
    .then( response => {return response.text()})
    .then( async htmlText => {
      const $ = cheerio.load(htmlText);
      var key = 1
          const tdList = $('#content_wrap').find('table:nth-child(21)').find('td:nth-child(2)')
         
          const noOfItems = Object.keys(tdList).filter( k => {
            return (parseInt(k) == k)
          })
                
          var localDocList = []
          await firestore().collection('Food GIfs').get().then(snapshot => {
            snapshot.forEach(doc => {
              localDocList.push(doc)
            })
           
          for (var i=1 ; i<noOfItems.length; i++){
            const foodItemAndPrices = {}
            const item = $('#content_wrap').find('table:nth-child(21)').find('td:nth-child(2)')[i].children[0].data
            const priceQuarter = $('#content_wrap').find('table:nth-child(21)').find('td:nth-child(3)')[i].children[0].data
            const priceHalf = $('#content_wrap').find('table:nth-child(21)').find('td:nth-child(4)')[i].children[0].data
            const priceStandard = $('#content_wrap').find('table:nth-child(21)').find('td:nth-child(5)')[i].children[0].data
            if (item != undefined){
              foodItemAndPrices['item'] = item
              foodItemAndPrices['quarter'] = priceQuarter
              foodItemAndPrices['half'] = priceHalf
              foodItemAndPrices['standard'] = priceStandard
              foodItemAndPrices['key'] = key
              key++
              for (var j=0 ; j<localDocList.length; j++){
                if(localDocList[j].id == item){
                    foodItemAndPrices['img'] = localDocList[j].data().img
                    break
                }
                else{
                    foodItemAndPrices['img'] = localDocList[0].data().img
                }
              }
            }
            dataToReturn.push(foodItemAndPrices)
          }
        })
        if(dataToReturn.length == 0){
          dataToReturn = ['Menu not available']
        }
    })
    .catch(err => console.log(err))

    return dataToReturn
}