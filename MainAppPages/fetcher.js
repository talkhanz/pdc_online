import React from 'react';
import {Text} from 'react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
const cheerio = require('cheerio-without-node-native');

export async function fetchBreakfastMenu(){

  var dataToReturn = []

  await fetch('https://pdc.lums.edu.pk/')
    .then( response => {return response.text()})
    .then( htmlText => {
      const $ = cheerio.load(htmlText);
      var key = 1
      try{
          const tdList = $('#content_wrap').find('table:nth-child(10)').find('td:nth-child(2)')
          const no0fItems = Object.keys(tdList).filter( k => {
            return (parseInt(k) == k)
          })
        for (var i=1 ; i<no0fItems.length; i++){
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
            }
            dataToReturn.push(foodItemAndPrices)
        }
      }
      catch(err){
        console.log(err)
        dataToReturn = ['Menu not available']
      }
    })
    .catch(err => console.log(err))

    return dataToReturn
}
export async function fetchLunchMenu(){

  var dataToReturn = []

  await fetch('https://pdc.lums.edu.pk/')
    .then( response => {return response.text()})
    .then( htmlText => {
      const $ = cheerio.load(htmlText);
      var key = 1
      try{
        const tdList = $('#content_wrap').find('table:nth-child(10)').find('td:nth-child(2)')
        const no0fItems = Object.keys(tdList).filter( k => {
          return (parseInt(k) == k)
        })
      for (var i=1 ; i<no0fItems.length; i++){
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
            }
            dataToReturn.push(foodItemAndPrices)
        }
      }
      catch(err){
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
    .then( htmlText => {
      const $ = cheerio.load(htmlText);
      var key = 1
      try{
        const tdList = $('#content_wrap').find('table:nth-child(10)').find('td:nth-child(2)')
        const no0fItems = Object.keys(tdList).filter( k => {
          return (parseInt(k) == k)
        })
      for (var i=1 ; i<no0fItems.length; i++){
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
            }
            dataToReturn.push(foodItemAndPrices)
        }
      }
      catch(err){
        dataToReturn = ['Menu not available']
      }
    })
    .catch(err => console.log(err))

    return dataToReturn
}