<script src="./assets/weather-app-main.js"></script>
<style>@import './assets/style.css';</style>

<template>
  <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
    <main>
      <div class="search-box">
        <input 
          type="text" 
          class="search-bar" 
          placeholder="Search..."
          v-model="query"
          @keypress="fetchWeather"
        />
      </div>

      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
          <div class="date">{{ dateBuilder() }}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.main.temp) }}°c</div>
          <div class="weather">{{ weather.weather[0].main }}</div>
        </div>
      </div>

      <div class="weather-wrap">
        <div class="location-box">
          <tr style="color: white" id="example-1">Previous Queries:
            <td style="color: white;" v-for="previousQuery in previousQueries" :key="previousQuery.query">
              <button @click="showHistory(previousQuery)">{{ previousQuery }}</button>
              <br>
            </td>
          </tr>
        </div>
      </div>

      <div class="weather-wrap">
        <div class="location-box">
          <button @click="clearHistory">Clear History</button>
        </div>
      </div>

    </main>
  </div>
</template>