<template>
  <div class="app">
    <div class="counter-card">
      <h1 class="title">{{ title }}</h1>
      
      <div class="counter-display">
        <transition name="bounce" mode="out-in">
          <span :key="count" class="count-number">{{ count }}</span>
        </transition>
      </div>

      <div class="controls">
        <button 
          @click="decrement" 
          class="btn btn-decrement"
          :disabled="count <= -10"
        >
          <span class="btn-icon">−</span>
          Уменьшить
        </button>
        
        <button 
          @click="reset" 
          class="btn btn-reset"
        >
          <span class="btn-icon">↺</span>
          Сбросить
        </button>
        
        <button 
          @click="increment" 
          class="btn btn-increment"
          :disabled="count >= 10"
        >
          <span class="btn-icon">+</span>
          Увеличить
        </button>
      </div>

      <div class="stats">
        <div class="stat-item">
          <span class="stat-label">Изменения:</span>
          <span class="stat-value">{{ changeHistory.length }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Тренд:</span>
          <span 
            class="stat-value"
            :class="getTrendClass"
          >
            {{ getTrend }}
          </span>
        </div>
      </div>
    </div>

    <!-- История изменений -->
    <div class="history" v-if="changeHistory.length > 0">
      <h3>История изменений</h3>
      <transition-group name="list" tag="div" class="history-list">
        <div 
          v-for="change in changeHistory.slice().reverse()" 
          :key="change.id"
          class="history-item"
          :class="change.type"
        >
          <span class="history-time">{{ change.time }}</span>
          <span class="history-value">{{ change.value }}</span>
          <span class="history-type">{{ change.type === 'increment' ? '↑' : '↓' }}</span>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Vue Счётчик',
      count: 0,
      changeHistory: []
    }
  },
  computed: {
    getTrend() {
      if (this.changeHistory.length < 2) return '—'
      const last = this.changeHistory[this.changeHistory.length - 1]
      const prev = this.changeHistory[this.changeHistory.length - 2]
      return last.value > prev.value ? '📈 Растёт' : last.value < prev.value ? '📉 Падает' : '➡ Стабильно'
    },
    getTrendClass() {
      const trend = this.getTrend
      if (trend.includes('Растёт')) return 'trend-up'
      if (trend.includes('Падает')) return 'trend-down'
      return 'trend-neutral'
    }
  },
  methods: {
    increment() {
      this.count++
      this.addToHistory('increment')
    },
    decrement() {
      this.count--
      this.addToHistory('decrement')
    },
    reset() {
      this.count = 0
      this.addToHistory('reset')
    },
    addToHistory(type) {
      this.changeHistory.push({
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        value: this.count,
        type: type
      })
      
      // Ограничиваем историю последними 5 записями
      if (this.changeHistory.length > 5) {
        this.changeHistory = this.changeHistory.slice(-5)
      }
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
}

body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.counter-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  text-align: center;
  max-width: 500px;
  width: 100%;
  margin-bottom: 30px;
}

.title {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 30px;
  font-weight: 300;
  background: linear-gradient(135deg, #42b883, #35495e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.counter-display {
  font-size: 5rem;
  font-weight: bold;
  margin: 30px 0;
  color: #42b883;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.count-number {
  display: inline-block;
}

.controls {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn:active {
  transform: translateY(2px);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn:disabled::before {
  display: none;
}

.btn-increment {
  background: linear-gradient(135deg, #42b883, #3498db);
  color: white;
}

.btn-decrement {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.btn-reset {
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
  color: white;
}

.btn-icon {
  font-size: 1.2rem;
  font-weight: bold;
}

.stats {
  display: flex;
  justify-content: space-around;
  background: rgba(52, 73, 94, 0.1);
  padding: 20px;
  border-radius: 15px;
  margin-top: 20px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
}

.trend-up { color: #27ae60; }
.trend-down { color: #e74c3c; }
.trend-neutral { color: #f39c12; }

.history {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  max-width: 500px;
  width: 100%;
}

.history h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 300;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 10px;
  background: rgba(52, 73, 94, 0.05);
  transition: all 0.3s ease;
}

.history-item.increment {
  border-left: 4px solid #42b883;
}

.history-item.decrement {
  border-left: 4px solid #e74c3c;
}

.history-item.reset {
  border-left: 4px solid #95a5a6;
}

.history-time {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.history-value {
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.1rem;
}

.history-type {
  font-size: 1.2rem;
  font-weight: bold;
}

/* Анимации */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

/* Анимация для кнопок при наведении */
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Адаптивность */
@media (max-width: 600px) {
  .counter-card {
    padding: 30px 20px;
    margin: 10px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .counter-display {
    font-size: 4rem;
  }
  
  .controls {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 200px;
  }
  
  .stats {
    flex-direction: column;
    gap: 15px;
  }
}
</style>