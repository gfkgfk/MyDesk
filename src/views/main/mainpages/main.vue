<template>
    <div id="main" class="main">
        <digitalrain style="position: absolute;bottom:0;top:0;"></digitalrain>
        <transition name="el-zoom-in-center" v-on:after-enter="afterEnter">
            <cmd ref="cmd" v-show="cmdShow" class="cmd" @cmdCallback="cmdCallback"></cmd>
        </transition>

        <transition name="el-fade-in-linear">
            <div class="middle" v-if="showload">
                <div class="progress-title fs20">Loading...</div>
                <el-progress class="progress" type="line" :text-inside="true" :stroke-width="30" :percentage="percentage" :color="progressBarColor"></el-progress>
            </div>
        </transition>

        <div class="weather" v-if="weatherShow">
            <div class="weather-container">
                <el-collapse class="weather-collapse" v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="WEATHER" name="1">
                        <div class="weather-item">CITY: {{city}}</div>
                        <div class="weather-item">WEEK: {{week}}</div>
                        <div class="weather-item">UPDATETIME: {{updateTime}}</div>
                        <div class="weather-item">WEATHER: {{weather}}</div>
                        <div class="weather-item">REALTEMPRATURE: {{realTemprature}}</div>
                        <div class="weather-item">DAYTEMPRATURE: {{dayTemprature}}</div>
                        <div class="weather-item">NIGHTTEMPRATURE: {{nightTemprature}}</div>
                        <div class="weather-item">WIND: {{wind}}</div>
                        <div class="weather-item">WINDSPEED: {{windSpeed}}</div>
                        <div class="weather-item">WINDMETER: {{windMeter}}</div>
                        <div class="weather-item">AIR: {{air}}</div>
                        <div class="weather-item">PRESURE: {{pressure}}</div>
                        <div class="weather-item">HUMIDITY: {{humidity}}</div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <div class="footer" @click="getWeather">{{footerInfo}}</div>

    </div>
</template>

<script>
import config from '@/userconfig'
import cmd from '@/components/cmdr/cmdr'
import digitalrain from '@/components/digitalrain/digitalrain'
import cmdhandler from './js/cmdhandler'
import { dateFormat } from '@/utils/utils'
export default {
    inject: ['reload'],
    components: {
        cmd,
        digitalrain
    },
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
            cmdShow: false,
            weatherShow: false,
            timer: '',
            activeNames: '',
            city: '--',
            week: '--',
            updateTime: '--',
            weather: '--',
            realTemprature: '--',
            dayTemprature: '--',
            nightTemprature: '--',
            wind: '--',
            windSpeed: '--',
            windMeter: '--',
            air: '--',
            pressure: '--',
            humidity: '--'
        }
    },
    beforeDestroy() {
        console.log('beforeDestroy')

        if (this.timer) {
            clearInterval(this.timer) // remove timer
        }
    },
    methods: {
        refresh() {
            this.reload()
        },
        afterEnter() {
            // after transition,to active cmd and fix cmd indicator display style
            this.$refs.cmd.active()
        },
        cmdCallback(commandLine, terminal, cancelToken, resolve) {
            // terminal.writeLine(new Date().toString())  terminal.writeLine:display the string on cmd window
            // cancelToken.onCancel(function() {  cancelToken.onCancel() : ctrl+c to break event handle
            //     do sth...
            //     resolve()
            // })
            // resolve() finish action

            console.log('commandLine', commandLine)
            cmdhandler.handler(commandLine, terminal, cancelToken, resolve, this)
        },

        handleChange(val) {
            console.log('handleChange', val)
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
                    //request weather info success then display the weather widget
                    this.weatherShow = true
                })
                .catch(err => {
                    console.log(err)
                })
        },
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
            }, 500)
        },
        showUI() {
            this.cmdShow = true
        },
        showFooter() {
            this.footerInfo = dateFormat(this.date)
            this.timer = setInterval(() => {
                this.date = new Date()
                this.footerInfo = dateFormat(this.date)
            }, 1000)
        },
        download() {
            let a = document.createElement('a')
            a.href = '/static/download/watch.7z'
            a.click()
        }
    },
    created() {
        this.loadStart() // start loading progress
        this.showFooter() // start timer
        this.getWeather() // request the weather info
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
    opacity: 0.8;
    .weather-container {
        border: 1px solid;
        border-radius: 5px;
        background: white;
        padding-left: 10px;
        .weather-collapse {
            width: 200px;
            .weather-item {
                padding: 5px;
            }
        }
    }
}
.footer {
    position: fixed;
    padding: 5px 10px;
    font-weight: 600;
    width: 100%;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
}
.cmd {
    width: 889px;
    height: 500px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    border-radius: 5px;
    padding: 10px;
    opacity: 0.8;
    background: #000000;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.bg-purple-light {
    background: #e5e9f2;
}
.bg-purple-dark {
    background: #99a9bf;
}

/* find the digital rain background canvas */
#canvasmark {
}
/* find the digital rain background div */
#divmark {
}
</style>