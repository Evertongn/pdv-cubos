import axios from 'axios';

export default class UserServices {
    constructor() {
        this.axios = axios.create({
            baseURL: "https://pdv-cubos-d1ws.vercel.app/"
        })
    }

    async login(dados) {
        const { data } = await this.axios.post('/login', dados)

        if (data) {
            localStorage.setItem("nome", data.usuario.nome)
            localStorage.setItem("email", data.usuario.email)
            localStorage.setItem("token", data.token)

            return true
        }

        return
    }

    async cadastrar(dados) {
        return await this.axios.post('/usuario', dados)
    }

    async atualizar(dados, token) {
        return await this.axios.put('/usuario', dados, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    async categorias() {
        try {
            const response = await this.axios.get('/categoria')

            return response.data;
        } catch (error) {
            console.error('Erro ao obter categorias:', error);
            throw error;
        }
    }

    async cadastrarProdutos(dados) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.axios.post('/produto', dados, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.error('Erro ao obter produtos:', error);
            throw error;
        }
    }

    async excluirProduto(id) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.axios.delete(`/produto/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.error('Erro ao obter produtos:', error);
            throw error;
        }
    }


    async atualizarProduto(dados, id) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.axios.put(`/produto/${id}`, dados, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response // Retorna os dados da resposta (opcional)
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            throw error; // Rejeita a promise com o erro para tratamento externo
        }
    }

    async produtos() {
        const token = localStorage.getItem('token')
        try {
            const response = await this.axios.get('/produto', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao obter produtos:', error);
            throw error;
        }
    }

    async clientes() {
        const token = localStorage.getItem('token')
        try {
            const response = await this.axios.get('/cliente', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao obter produtos:', error);
            throw error;
        }
    }

    async cadastrarCliente(dados) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.axios.post('/cliente', dados, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.error('Erro ao obter produtos:', error);
            throw error;
        }
    }

    async atualizarCliente(dados, id) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.axios.put(`/cliente/${id}`, dados, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data; // Retorna os dados da resposta (opcional)
        } catch (error) {
            console.error("Erro ao atualizar Cliente:", error);
            throw error; // Rejeita a promise com o erro para tratamento externo
        }
    }

    async pedidos() {
        const token = localStorage.getItem('token')
        try {
            const response = await this.axios.get('/pedido', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao obter produtos:', error);
            throw error;
        }
    }
    async cadastrarPedidos(dados) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.axios.post('/pedido', dados, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.error('Erro cadastra pedido:', error);
            throw error;
        }
    }


    usuarioAutenticado() {
        return localStorage.getItem("token") != undefined ? true : false
        // return typeof localStorage.getItem("token")
    }

    async logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("nome")
        localStorage.removeItem("email")
    }
}