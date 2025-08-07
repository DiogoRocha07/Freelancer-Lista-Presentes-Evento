import json

# Lê o arquivo itens.txt
with open('itens.txt', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Gera os comandos INSERT
print("-- Comandos INSERT para a tabela presentes")
print("-- Baseado no arquivo itens.txt")
print()

for i, item in enumerate(data, 1):
    url = item['url'].replace("'", "''")  # Escapa aspas simples
    title = item['title'].replace("'", "''")  # Escapa aspas simples
    value = item['value'] if item['value'] is not None else 'NULL'
    image_url = item['image-url'] if item['image-url'] is not None else 'NULL'
    
    if value == 'NULL':
        value_str = 'NULL'
    else:
        value_str = str(value)
    
    if image_url == 'NULL':
        image_url_str = 'NULL'
    else:
        image_url_str = f"'{image_url}'"
    
    print(f"INSERT INTO presentes (url, title, value, image_url) VALUES")
    print(f"('{url}', '{title}', {value_str}, {image_url_str});")
    print()

print(f"-- Total de {len(data)} registros inseridos") 