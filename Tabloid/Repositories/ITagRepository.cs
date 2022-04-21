using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAll();

        Tag GetTagById(int Id); 

        void CreateTag(Tag tag);

        void EditTag(Tag tag); 
    }
}