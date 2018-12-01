using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Newtonsoft.Json;

namespace Web.Features.Home
{
    public class Index
    {
        public class Query : IRequest<Result>
        {

        }

        public class Result
        {
        }

        public class IndexHandler : IRequestHandler<Query, Result>
        {
            private readonly IMapper _mapper;

            public IndexHandler(IMapper mapper)
            {
                _mapper = mapper;
            }

            public async Task<Result> Handle(Query request, CancellationToken cancellationToken)
            {
                var response = new Result();

                return await Task.FromResult(response);
            }
        }

    }
}
