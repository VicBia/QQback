import sys
import json
import csv
import os

def export_to_csv(json_file):
    # Carregar os dados JSON
    with open(json_file, 'r') as f:
        data = json.load(f)

    # Definir o caminho do CSV em outro local
    csv_file = os.path.join("C:/Users/980244/Documents", 'users_report.csv')

    # Verificar se há dados
    if len(data) == 0:
        print("Nenhum dado encontrado para exportar.")
        return

    # Abrir o arquivo CSV para escrita
    with open(csv_file, 'w', newline='', encoding='utf-8') as csvfile:
    # Definir as colunas e salvar o CSV
        fieldnames = ['registration', 'user_name', 'email', 'store_name']  
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()

        # Escrever cada usuário no CSV
        for user in data:
            writer.writerow({
                'matricula': user['registration'],
                'nome': user['user_name'],
                'email': user['email'],
                'loja': user['Store']['store_name']
            })

    print(f"Dados exportados para {csv_file}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Uso: python3 export_to_csv.py <caminho_arquivo_json>")
        sys.exit(1)

    json_file = sys.argv[1]
    export_to_csv(json_file)
