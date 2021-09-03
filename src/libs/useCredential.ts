import Credential from "./credential"

const useCredential = async () => {
    return await new Credential().load()
}

export default useCredential