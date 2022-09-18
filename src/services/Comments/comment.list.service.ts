import { AppDataSource } from "../../data-source";
import Comment from "../../models/Comment";


const commentListService = async () => {
    
    const commentRepository = AppDataSource.getRepository(Comment);
    const comments = await commentRepository.find({relations:['user', 'ad']})
    return comments
  
};

export default commentListService;
