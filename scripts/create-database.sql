-- Criação do banco de dados educacional
-- Este script cria todas as tabelas necessárias para o sistema

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    total_xp INTEGER DEFAULT 0,
    current_level INTEGER DEFAULT 1,
    profile_picture VARCHAR(255),
    bio TEXT
);

-- Tabela de estações (seasons)
CREATE TABLE IF NOT EXISTS seasons (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    language VARCHAR(30) NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de fases (phases)
CREATE TABLE IF NOT EXISTS phases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    season_id VARCHAR(20) NOT NULL,
    phase_number INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    is_unlocked_by_default BOOLEAN DEFAULT FALSE,
    xp_reward INTEGER DEFAULT 50,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (season_id) REFERENCES seasons(id),
    UNIQUE(season_id, phase_number)
);

-- Tabela de exercícios
CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phase_id INTEGER NOT NULL,
    exercise_number INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    instruction TEXT NOT NULL,
    expected_code TEXT NOT NULL,
    hint TEXT,
    difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'easy',
    points INTEGER DEFAULT 25,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (phase_id) REFERENCES phases(id),
    UNIQUE(phase_id, exercise_number)
);

-- Tabela de progresso do usuário
CREATE TABLE IF NOT EXISTS user_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    season_id VARCHAR(20) NOT NULL,
    phase_id INTEGER NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    completion_date TIMESTAMP,
    xp_earned INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (season_id) REFERENCES seasons(id),
    FOREIGN KEY (phase_id) REFERENCES phases(id),
    UNIQUE(user_id, phase_id)
);

-- Tabela de submissões de exercícios
CREATE TABLE IF NOT EXISTS exercise_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    exercise_id INTEGER NOT NULL,
    submitted_code TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    attempts INTEGER DEFAULT 1,
    points_earned INTEGER DEFAULT 0,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);

-- Tabela de conquistas (achievements)
CREATE TABLE IF NOT EXISTS achievements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    condition_type VARCHAR(50) NOT NULL, -- 'complete_season', 'earn_xp', 'streak_days', etc.
    condition_value INTEGER,
    x
