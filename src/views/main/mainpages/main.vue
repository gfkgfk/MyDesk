<template>
    <div class="main">
        <div></div>
        <transition name="el-fade-in-linear">
            <div class="middle" v-if="showload">
                <div class="progress-title fs20">Loading...</div>
                <el-progress class="progress" type="line" :text-inside="true" :stroke-width="30" :percentage="percentage" :color="progressBarColor"></el-progress>
            </div>
        </transition>

        <div class="weather" @click="getWeather">
            <el-collapse class="weather-collapse" v-model="activeNames" @change="handleChange">
                <el-collapse-item title="WEATHER" name="1">
                    <div class="weather-item">CITY:{{city}}</div>
                    <div class="weather-item">WEEK:{{week}}</div>
                    <div class="weather-item">UPDATETIME:{{updateTime}}</div>
                    <div class="weather-item">WEATHER:{{weather}}</div>
                    <div class="weather-item">REALTEMPRATURE:{{realTemprature}}</div>
                    <div class="weather-item">DAYTEMPRATURE:{{dayTemprature}}</div>
                    <div class="weather-item">NIGHTTEMPRATURE:{{nightTemprature}}</div>
                    <div class="weather-item">WIND:{{wind}}</div>
                    <div class="weather-item">WINDSPEED:{{windSpeed}}</div>
                    <div class="weather-item">WINDMETER:{{windMeter}}</div>
                    <div class="weather-item">AIR:{{air}}</div>
                    <div class="weather-item">PRESURE:{{pressure}}</div>
                    <div class="weather-item">HUMIDITY:{{humidity}}</div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="footer" @click="getWeather">{{footerInfo}}</div>

    </div>
</template>

<script>
import { dateFormat } from '@/utils/utils'
import config from '@/userconfig'
import './js/digitalrain'
export default {
    data() {
        return {
            date: new Date(),
            footerInfo: '',
            percentage: 0,
            progressBarColor: [
                { color: '#f56c6c', percentage: 40 },
                { color: '#e6a23c', percentage: 70 },
                { color: '#1989fa', percentage: 90 },
                { color: '#5cb87a', percentage: 100 }
            ],
            showload: false,
            timer: '',
            activeNames:'',
            city:'--',
            week:'--',
            updateTime:'--',
            weather:'--',
            realTemprature:'--',
            dayTemprature:'--',
            nightTemprature:'--',
            wind:'--',
            windSpeed:'--',
            windMeter:'--',
            air:"--",
            pressure:'--',
            humidity:'--'

        }
    },
    methods: {
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer) // remove timer
            }
        },
        handleChange(val){
            console.log('handleChange',val);
        },
        getWeather() {
            let url =
                config.weatherApi + '?appid=' + config.weatherAppid + '&appsecret=' + config.appsecret + '&unescape=1'
            this.$jsonp(url)
                .then(res => {
                    this.city = res.city
                    this.week = res.week
                    this.updateTime = res.date
                    this.weather = res.wea
                    this.realTemprature = res.tem
                    this.dayTemprature = res.tem_day
                    this.nightTemprature = res.tem_night
                    this.wind = res.win
                    this.windSpeed = res.win_speed
                    this.windMeter = res.win_meter
                    this.air = res.air
                    this.pressure = res.pressure
                    this.humidity = res.humidity
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })

            console.log('测试')
        },
        getIp() {},
        loadStart() {
            this.showload = true
            let timerTask = setInterval(() => {
                this.percentage += 10
                if (this.percentage > 100) {
                    this.percentage = 100
                    clearInterval(timerTask)
                    this.loadFinish()
                }
            }, 250)
        },
        loadFinish() {
            this.showload = false
            setTimeout(() => {
                this.showUI()
            }, 1000)
        },
        showUI() {},
        showFooter() {
            this.footerInfo = dateFormat(this.date)
            this.timer = setInterval(() => {
                this.date = new Date()
                this.footerInfo = dateFormat(this.date)
            }, 1000)
        }
    },
    created() {
        //TODO:remove the element to avoid the effect of heart page(three.js)

        this.loadStart()
        this.showFooter()
    }
}
</script>

<style lang="scss" >
.main {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    color: white;
}
.middle {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .progress-title {
        padding: 10px;
        color: white;
    }
    .progress {
        width: 50%;
        opacity: 0.6;
    }
}

.weather {
    padding: 10px;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    display: flex;
    .weather-collapse{
        width: 200px;
        .weather-item{
            padding: 5px;
        }
    }
}
.footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
}

/* find the digital rain background canvas */
#canvasmark {
}
/* find the digital rain background div */
#divmark {
}
</style>