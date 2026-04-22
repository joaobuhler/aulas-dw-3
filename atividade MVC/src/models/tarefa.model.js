const tarefas = [
  { id: 1, descricao: "Fazer compras", concluido: false },
  { id: 2, descricao: "Lavar o carro", concluido: false },
  { id: 3, descricao: "Estudar Fastify", concluido: true }
]

class TarefaModel {
  async listar({ busca, concluido }) {
    console.log("Model: listar chamado")

    let resultado = tarefas

    if (busca) {
      resultado = resultado.filter(t =>
        t.descricao.toLowerCase().includes(busca.toLowerCase())
      )
    }

    if (concluido !== undefined) {
      const bool = concluido === 'true' || concluido === true
      resultado = resultado.filter(t => t.concluido === bool)
    }

    return resultado
  }

  async criar(descricao) {
    console.log("Model: criar chamado")

    const novoId = tarefas.length ? tarefas[tarefas.length - 1].id + 1 : 1

    const nova = {
      id: novoId,
      descricao,
      concluido: false
    }

    tarefas.push(nova)
    return nova
  }

  async buscarPorId(id) {
    console.log("Model: buscarPorId chamado")
    return tarefas.find(t => t.id === id)
  }

  async atualizar(id, dados) {
    console.log("Model: atualizar chamado")

    const index = tarefas.findIndex(t => t.id === id)
    if (index === -1) return null

    tarefas[index] = { ...tarefas[index], ...dados, id }
    return tarefas[index]
  }

  async alternarConcluido(id) {
    console.log("Model: alternarConcluido chamado")

    const tarefa = tarefas.find(t => t.id === id)
    if (!tarefa) return null

    tarefa.concluido = !tarefa.concluido
    return tarefa
  }

  async remover(id) {
    console.log("Model: remover chamado")

    const index = tarefas.findIndex(t => t.id === id)
    if (index === -1) return false

    tarefas.splice(index, 1)
    return true
  }

  async obterResumo() {
    console.log("Model: obterResumo chamado")

    const total = tarefas.length
    const concluidas = tarefas.filter(t => t.concluido).length
    const pendentes = total - concluidas

    return { total, concluidas, pendentes }
  }

  async listarPendentes() {
    console.log("Model: listarPendentes chamado")

    return tarefas.filter(t => t.concluido === false)
  }
}

export default new TarefaModel()