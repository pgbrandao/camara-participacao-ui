import requests

for year in [2019, 2020, 2021]:
    r = requests.get(f'http://midias.camara.leg.br/painel-participacao/api/relatorio-consolidado/?year={year}')
    f = open(f'relatorio-consolidado/{year}.json', 'w')
    f.write(r.text)
    f.close()
    j = r.json()
    for (p, _) in j['periods_api_params']:
        r2 = requests.get(f'http://midias.camara.leg.br/painel-participacao/api/top-proposicoes/{p}')
        p = p.replace('/', '|')
        f = open(f'top-proposicoes/{p}.json', 'w')
        f.write(r2.text)
        f.close()
    for (p, _) in j['periods_api_params']:
        r2 = requests.get(f'http://midias.camara.leg.br/painel-participacao/api/top-noticias/{p}')
        p = p.replace('/', '|')
        f = open(f'top-noticias/{p}.json', 'w')
        f.write(r2.text)
        f.close()