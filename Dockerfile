FROM quay.io/gurusensei/gurubhay:latest

RUN useradd -u 10014 -m -d /home/appuser -s /bin/bash appuser

RUN git clone https://github.com/Guru322/GURU-Ai /home/appuser/guru \
    && chown -R appuser:appuser /home/appuser/guru

WORKDIR /home/appuser/guru/

RUN npm install --platform=linuxmusl

EXPOSE 5000

USER 10014

CMD ["npm", "start"]

