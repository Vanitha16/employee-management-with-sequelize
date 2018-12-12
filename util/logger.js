var winston = require('winston');
const loggerLevel = process.env.LOGGER_LEVEL || "debug" || "info" || "error";
const t = new Date()+"UTC"


let alignColorsAndTime = winston.format.combine(
  
  winston.format.colorize(),
  winston.format.label({
      label:'[LOG]'
  }),
  winston.format.timestamp({
      format:"YYYY-MM-DD HH:mm:ss"
  }),
  winston.format.printf(
      info => ` ${info.label}  ${info.timestamp}  ${info.level}: ${info.message}`
  )
);

const logger = winston.createLogger({
    
format: winston.format.combine(winston.format.colorize(), alignColorsAndTime),
    transports: [
        new winston.transports.Console(
            { 
                level: loggerLevel
            }),
      new winston.transports.File({
        filename: 'errors.log',
        level: 'error'
      })
    ]
  });

  module.exports = logger;

