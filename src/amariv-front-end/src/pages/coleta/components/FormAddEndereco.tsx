import { useState } from "react"
import Input from "../../../components/re_components/Inputs/Input"
import { ViaCepService } from "../../../services/ViaCepService"
import { Endereco } from "../../../types/Endereco"

export type FormAddEnderecoProps ={    
    endereco: Endereco,
    salvarEndereco : (e : Endereco) => void
    errorEndereco : Boolean
}

export const FormAddEndereco = ({endereco, salvarEndereco, errorEndereco }: FormAddEnderecoProps) => {
    const cepRegex = /^[0-9]{8}$/
    const [loading, setLoading] = useState(false)
    const [loadingCep, setLoadingCep] = useState(false)
    const [errorCep, setErrorCep] = useState(false)
    const [errorLogradouro, setErrorLogradouro] = useState(false)
    const [errorNumero, setErrorNumero] = useState(false)
    const [errorBairro, setErrorBairro] = useState(false)
    const [errorCidade, setErrorCidade] = useState(false)

    
    return (
    
        <>      
           <div className="w-full flex items-center justify-center ">
                <div className="w-full min-h-screen lg:min-h-fit flex bg-light-backgroud items-center flex-col lg:min-w-max ">
                    <div className="w-full flex flex-row gap-2  px-6 mt-8 mb-4">
                        <Input title="CEP"
                            titleColor="dark"
                            mask="99999-999"
                            requiredField
                            value={endereco.cep}
                            error={errorCep}
                            rightLoading={loadingCep}
                            errorMessage="Digite um CEP válido"
                            onChange={v => {
                                setErrorCep(false)
                                let copiaForm = { ...endereco }
                                copiaForm.cep = v.target.value.replace(/\D/g, '')
                                salvarEndereco(copiaForm)
                            }}
                            onChangeDebounce={async (value) => {
                                if (cepRegex.test(value) && value != "") {
                                    setLoadingCep(true)
                                    let result = await ViaCepService.buscarEndereco(value)

                                    if (result.erro == null || result.erro == undefined) {
                                        let copiaForm = { ...endereco }
                                        copiaForm.logradouro = result.logradouro
                                        copiaForm.bairro = result.bairro
                                        copiaForm.cidade = result.localidade
                                        salvarEndereco(copiaForm)
                                    }
                                    setLoadingCep(false)
                                }
                                else if (!cepRegex.test(value) && value != "") {
                                    setErrorCep(true)
                                }
                            }}
                        />
                        <Input
                            title="Logradouro"
                            error={errorLogradouro}
                            errorMessage="Digite um logradouro"
                            titleColor="dark"
                            requiredField
                            value={endereco.logradouro}
                            onChange={v => {
                                setErrorLogradouro(false)
                                let copiaForm = { ...endereco }
                                copiaForm.logradouro = v.target.value
                                salvarEndereco(copiaForm)
                            }} />
                        <Input title="Número"
                            error={errorNumero}
                            errorMessage="Digite um número"
                            titleColor="dark"
                            requiredField
                            type="number"
                            value={endereco.numero}
                            onChange={v => {
                                setErrorNumero(false)
                                let copiaForm = { ...endereco }
                                copiaForm.numero = v.target.value.replace(/\D/g, '')
                                salvarEndereco(copiaForm)
                            }} />
                    </div>
                    <div className="w-full flex flex-row gap-2  px-6 mt-4 mb-8">
                        <Input
                            title="Bairro"
                            error={errorBairro}
                            errorMessage="Digite um bairro"
                            titleColor="dark"
                            requiredField
                            value={endereco.bairro}
                            onChange={v => {
                                setErrorBairro(false)
                                let copiaForm = { ...endereco }
                                copiaForm.bairro = v.target.value
                                salvarEndereco(copiaForm)
                            }} />
                        <Input
                            title="Cidade"
                            error={errorCidade}
                            errorMessage="Digite uma cidade"
                            titleColor="dark"
                            requiredField
                            value={endereco.cidade}
                            onChange={v => {
                                setErrorCidade(false)
                                let copiaForm = { ...endereco }
                                copiaForm.cidade = v.target.value
                                salvarEndereco(copiaForm)
                            }} />
                        <Input
                            title="Referência"
                            titleColor="dark"
                            onChange={v => {
                                let copiaForm = { ...endereco }
                                copiaForm.referencia = v.target.value
                                salvarEndereco(copiaForm)
                            }} />
                    </div>
                </div>
            </div>
        </>
    );
}

