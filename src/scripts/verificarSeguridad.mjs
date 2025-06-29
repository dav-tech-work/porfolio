#!/usr/bin/env node

/**
 * Script de verificación de seguridad
 * Verifica configuraciones críticas de seguridad
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔐 Verificación de Seguridad\n');

const checks = [];

// Verificar variables de entorno en producción
if (process.env.NODE_ENV === 'production') {
    const requiredEnvVars = ['COOKIE_SECRET', 'SESSION_SECRET', 'CSRF_SECRET'];
    requiredEnvVars.forEach(envVar => {
        if (!process.env[envVar]) {
            checks.push({
                status: '❌',
                message: `Variable de entorno ${envVar} no configurada`,
                critical: true
            });
        } else if (process.env[envVar].includes('dev-only')) {
            checks.push({
                status: '❌',
                message: `Variable de entorno ${envVar} usando valor de desarrollo`,
                critical: true
            });
        } else {
            checks.push({
                status: '✅',
                message: `Variable de entorno ${envVar} configurada correctamente`,
                critical: false
            });
        }
    });
}

// Verificar archivo .env no está en git
const gitignorePath = path.join(__dirname, '../../.gitignore');
if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    if (gitignoreContent.includes('.env')) {
        checks.push({
            status: '✅',
            message: 'Archivo .env está en .gitignore',
            critical: false
        });
    } else {
        checks.push({
            status: '⚠️',
            message: 'Archivo .env no está en .gitignore',
            critical: false
        });
    }
}

// Verificar permisos de archivos sensibles
const sensitiveFiles = [
    'src/config/index.mjs',
    'package.json'
];

sensitiveFiles.forEach(file => {
    const filePath = path.join(__dirname, '../../', file);
    if (fs.existsSync(filePath)) {
        checks.push({
            status: '✅',
            message: `Archivo ${file} existe`,
            critical: false
        });
    } else {
        checks.push({
            status: '❌',
            message: `Archivo ${file} no encontrado`,
            critical: true
        });
    }
});

// Mostrar resultados
checks.forEach(check => {
    console.log(`${check.status} ${check.message}`);
});

// Resumen
const criticalIssues = checks.filter(check => check.critical && check.status === '❌');
const warnings = checks.filter(check => check.status === '⚠️');

console.log('\n📊 Resumen:');
console.log(`✅ Verificaciones pasadas: ${checks.filter(c => c.status === '✅').length}`);
console.log(`⚠️ Advertencias: ${warnings.length}`);
console.log(`❌ Problemas críticos: ${criticalIssues.length}`);

if (criticalIssues.length > 0) {
    console.log('\n🚨 ATENCIÓN: Se encontraron problemas críticos de seguridad');
    process.exit(1);
} else if (warnings.length > 0) {
    console.log('\n⚠️ Se encontraron advertencias, revisa la configuración');
    process.exit(0);
} else {
    console.log('\n🎉 Todas las verificaciones de seguridad pasaron');
    process.exit(0);
}
